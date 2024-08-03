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
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
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

const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
