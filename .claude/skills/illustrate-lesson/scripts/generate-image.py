#!/usr/bin/env python
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "google-genai>=1.45",
#   "Pillow>=11.0",
# ]
# ///
"""
Generate images using Google's Nano Banana 2 (Gemini 3.1 Flash Image) API.

Usage:
  uv run generate-image.py --prompt "description" --filename "output.png" [--resolution 1K|2K|4K] [--padding 40]
  uv run generate-image.py --prompt "edit instructions" --filename "output.png" --input-image "input.png"
"""

import argparse
import base64
import io
import os
import sys
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image


def _hex_to_rgb(value: str) -> tuple[int, int, int]:
    h = value.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        raise SystemExit(f"Error: invalid hex color '{value}'. Expected #RRGGBB or #RGB.")
    try:
        return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    except ValueError as exc:
        raise SystemExit(f"Error: invalid hex color '{value}': {exc}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prompt", "-p", required=True)
    parser.add_argument("--filename", "-f", required=True)
    parser.add_argument("--input-image", "-i", dest="input_image", default=None)
    parser.add_argument("--resolution", "-r", choices=["1K", "2K", "4K"], default="2K")
    parser.add_argument("--padding", type=int, default=40)
    parser.add_argument(
        "--padding-color",
        default="#fafaf9",
        help="Hex color for padding fill. Default #fafaf9 matches --diagram-bg-panel so the PNG blends with DiagramFrame.",
    )
    args = parser.parse_args()

    padding_rgb = _hex_to_rgb(args.padding_color)

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.exit(
            "Error: GEMINI_API_KEY environment variable is not set.\n"
            "Set it in .claude/settings.local.json under env.GEMINI_API_KEY"
        )

    output_path = Path(args.filename).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    mime_map = {
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "webp": "image/webp",
        "gif": "image/gif",
    }

    if args.input_image:
        input_path = Path(args.input_image).resolve()
        image_bytes = input_path.read_bytes()
        ext = input_path.suffix.lower().lstrip(".")
        mime_type = mime_map.get(ext, "image/png")
        parts = [
            types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
            types.Part.from_text(text=args.prompt),
        ]
        print(f"Loaded input image: {args.input_image}")
        print(f"Editing image with resolution {args.resolution}...")
    else:
        parts = [types.Part.from_text(text=args.prompt)]
        print(f"Generating image with resolution {args.resolution}...")

    client = genai.Client(api_key=api_key)

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-image-preview",
            contents=[types.Content(role="user", parts=parts)],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
                image_config=types.ImageConfig(image_size=args.resolution),
            ),
        )
    except Exception as e:
        sys.exit(f"Error generating image: {e}")

    image_saved = False
    candidates = response.candidates or []
    for candidate in candidates:
        content = candidate.content
        if not content or not content.parts:
            continue
        for part in content.parts:
            if getattr(part, "text", None):
                print(f"Model response: {part.text}")
            elif getattr(part, "inline_data", None) and part.inline_data.data:
                raw = part.inline_data.data
                if isinstance(raw, str):
                    raw = base64.b64decode(raw)
                src = Image.open(io.BytesIO(raw)).convert("RGBA")
                if args.padding > 0:
                    dst = Image.new(
                        "RGBA",
                        (src.width + args.padding * 2, src.height + args.padding * 2),
                        (*padding_rgb, 255),
                    )
                    dst.paste(src, (args.padding, args.padding), src)
                    dst.convert("RGB").save(output_path, format="PNG")
                else:
                    src.convert("RGB").save(output_path, format="PNG")
                image_saved = True

    if not image_saved:
        sys.exit("Error: No image was generated in the response.")

    print(f"\nImage saved: {output_path}")


if __name__ == "__main__":
    main()
