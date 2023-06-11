import os

file_name = "hello_world.txt"
current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_dir, file_name)

# Open the file in write mode
with open(file_path, 'w') as file:
    file.write("Hello, World!")

print(f"File '{file_name}' created successfully at '{file_path}'.")

