import sys
import os

try:
    from PIL import Image
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    img = Image.open(input_path)
    # Crop (left, top, right, bottom)
    # We want exactly 2500x843 starting from 0,0
    cropped = img.crop((0, 0, 2500, 843))
    cropped.save(output_path)
    print("Success")
except ImportError:
    print("Error: PIL not installed")
except Exception as e:
    print(f"Error: {e}")
