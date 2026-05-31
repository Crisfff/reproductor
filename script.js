const ESPN_ENTRY_URL = "TU_M3U8_INICIAL_AQUI";

async function resolveFinalUrl(entryUrl) {
  const response = await fetch(entryUrl, {
    method: "GET",
    redirect: "follow"
  });

  console.log("URL final:", response.url);

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.url;
}

async function playEspn() {
  const video = document.getElementById("video");
  const status = document.getElementById("status");

  try {
    status.innerText = "Obteniendo token...";

    const finalUrl = await resolveFinalUrl(https://www.vavoo.to/play/2648419344/index.m3u8);

    status.innerText = "Token obtenido. Cargando video...";

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });

      hls.loadSource(finalUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
        status.innerText = "Reproduciendo ESPN Deportes.";
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error("HLS ERROR:", data);
        status.innerText = "Error: " + data.type + " / " + data.details;
      });

    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = finalUrl;
      await video.play();
      status.innerText = "Reproduciendo ESPN Deportes.";
    } else {
      status.innerText = "Tu navegador no soporta HLS.";
    }

  } catch (error) {
    console.error(error);
    status.innerText = "Error obteniendo token: " + error.message;
  }
}
