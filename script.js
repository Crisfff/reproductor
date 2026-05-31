function playEspn() {
  const video = document.getElementById("video");
  const status = document.getElementById("status");

  const url = "TU_M3U8_AQUI";

  status.innerText = "Cargando stream...";

  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    });

    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
      status.innerText = "Reproduciendo.";
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
      console.error(data);
      status.innerText = "Error al cargar el stream.";
    });

  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.play();
    status.innerText = "Reproduciendo.";
  } else {
    status.innerText = "Tu navegador no soporta HLS.";
  }
}
