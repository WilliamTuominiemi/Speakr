let mediaRecorder: MediaRecorder;
let audioChunks: Blob[] = [];

export const getLocalStream = () => {
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
      console.error(`you got an error: ${err}`);
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
  return new Promise<Blob>((resolve, reject) => {
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        resolve(audioBlob);
      };
      mediaRecorder.stop();
      console.log('Recording stopped');
    } else {
      reject('MediaRecorder not initialized');
    }
  });
};
