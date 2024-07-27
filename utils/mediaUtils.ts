import pako from 'pako';

let mediaRecorder: MediaRecorder;
let audioChunks: Blob[] = [];

export const getLocalStream = (setError: (error: string) => void) => {
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      (window as any).localStream = stream;
      const localAudio = document.getElementById('localAudio') as HTMLAudioElement;
      if (localAudio) {
        localAudio.srcObject = stream;
        localAudio.autoplay = true;
      }

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
    })
    .catch((err) => {
      setError('No audio device detected or access denied. Please check your microphone settings.');
    });
};

export const startRecording = () => {
  if (mediaRecorder) {
    audioChunks = [];
    mediaRecorder.start();
    console.log('Recording started');
  } else {
    console.error('MediaRecorder not initialized');
  }
};

export const stopRecording = () => {
  return new Promise<string>((resolve, reject) => {
    if (mediaRecorder) {
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const base64String = await convertBlobToBase64(audioBlob);
        resolve(base64String);
      };
      mediaRecorder.stop();
      console.log('Recording stopped');
    } else {
      reject('MediaRecorder not initialized');
    }
  });
};

const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
};

const convertBlobToBase64 = async (blob: Blob): Promise<string> => {
  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const compressedData = pako.deflate(uint8Array);
  return uint8ArrayToBase64(new Uint8Array(compressedData));
};
