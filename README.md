# upload-ai

![upload-ai-web](https://github.com/brkscosta/upload-ai/assets/31209677/f163bcf4-fd3e-42e8-b8de-fcfd258fa618)

## Overview

The Upload AI Web Application is a versatile platform that allows users to upload videos, convert them into audio files, transcribe the audio content, and generate related textual content based on user input. This powerful application leverages the OpenAI API for transcription, utilizes MongoDB along with Prisma for video information storage, and relies on Amazon S3 for data storage.

## Features

- Video to Audio Conversion: Easily convert uploaded videos into audio files for further processing.

- Audio Transcription: Uses the OpenAI API to transcribe the audio content from the uploaded videos.

- Content Generation: Generate textual content related to the video based on user input or preferences.

- Data Storage: Store information about uploaded videos using MongoDB and Prisma for efficient data management.

- File Storage: Use Amazon S3 for secure and scalable file storage.

## Instalation

1. Clone the repository
   ```bash
    git clone https://github.com/your-repo/upload-ai-web.git
   ```

2. Navigate to the project directory:
   ```bash
    cd upload-ai-web
   ```

3. Install the required dependencies:
   ```bash
    npm install
   ```
   Note: `pnpm i` is highly recommended

4. Start the development server:
   ```bash
    npm run dev
   ```

## Configuration

Make sure to configure the following environment variables for the application to work correctly:

`OPENAI_API_KEY`: Your OpenAI API key for audio transcription.

`MONGO_CONNECTION_STRING`: MongoDB connection string for database storage.

`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: Amazon S3 credentials for file storage.

Contributions are welcome!

## License

This project is licensed under the MIT License.
