import os

def rename_jpg_files(directory):
    # Change to the specified directory
    os.chdir(directory)

    # Get a list of all files in the directory
    files = os.listdir()

    # Filter only JPG files
    jpg_files = [file for file in files if file.lower().endswith(".jpg")]

    # Sort the JPG files alphabetically
    jpg_files.sort()

    # Rename the JPG files with numbering
    for index, jpg_file in enumerate(jpg_files, start=1):
        new_name = f"{index:03d}.jpg"  # Using zero-padding for three digits
        os.rename(jpg_file, new_name)
        print(f'Renamed "{jpg_file}" to "{new_name}"')

if __name__ == "__main__":
    # Replace 'your_directory_path' with the path of the directory containing the JPG files
    target_directory = './'

    # Ensure the directory path is valid
    if os.path.exists(target_directory) and os.path.isdir(target_directory):
        rename_jpg_files(target_directory)
    else:
        print(f"Invalid directory path: {target_directory}")
