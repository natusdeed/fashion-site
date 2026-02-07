import { NextResponse } from "next/server";
import Replicate from "replicate";

/**
 * Virtual Try-On API Route
 * Uses Replicate's IDM-VTON model (cuuupid/idm-vton) for best-in-class virtual try-on.
 * Input: human_image (model/influencer), garment_image (product/clothing)
 * Replicate accepts Buffer - we decode base64 and pass directly (no Vercel Blob needed).
 */
export async function POST(request: Request) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "REPLICATE_API_TOKEN is not configured. Add it to .env.local from https://replicate.com/account/api-tokens",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { modelImage, productImage } = body;

    if (!modelImage || !productImage) {
      return NextResponse.json(
        { success: false, error: "Both model image and product image are required." },
        { status: 400 }
      );
    }

    // Decode base64 data URLs to Buffer (Replicate accepts Buffer for automatic upload)
    const decodeBase64ToBuffer = (dataUrl: string): Buffer => {
      const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
      if (!base64) {
        throw new Error("Invalid base64 image data");
      }
      return Buffer.from(base64, "base64");
    };

    const humanBuffer = decodeBase64ToBuffer(modelImage);
    const garmentBuffer = decodeBase64ToBuffer(productImage);

    const replicate = new Replicate({ auth: token });

    const output = await replicate.run(
      "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
      {
        input: {
          human_image: humanBuffer,
          garment_image: garmentBuffer,
        },
      }
    );

    // Output is typically a URL string or array of URLs
    const imageUrl = typeof output === "string" ? output : Array.isArray(output) ? output[0] : (output as { url?: string })?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "No image returned from Replicate." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, image: imageUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Virtual try-on failed.";
    console.error("[virtual-tryon]", message, error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
