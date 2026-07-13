async function renderHtml(response, request) {
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");

  const url = new URL(request.url);
  const origin = url.origin;
  const isEnglish = /^\/en(?:\/|$)/.test(url.pathname);
  let html = await response.text();

  if (isEnglish) {
    html = html
      .replace('<html lang="zh-CN">', '<html lang="en">')
      .replaceAll("Mucyan 沐沧科技｜让技术清晰发生", "Mucyan | Technology Made Clear")
      .replaceAll(
        "Mucyan 沐沧科技，面向软件、智能应用、数据与系统方向，探索清晰、可靠、可持续的技术解决方案。",
        "Mucyan is a technology company based in Zibo, China, exploring software, intelligent applications, data services, and connected systems.",
      )
      .replaceAll(
        "面向软件、智能应用、数据与系统方向，探索清晰、可靠、可持续的技术解决方案。",
        "Exploring software, intelligent applications, data services, and connected systems with clarity, reliability, and a long-term perspective.",
      )
      .replace(
        'content="Mucyan,沐沧科技,软件开发,智能应用,数据服务,系统集成,淄博科技公司"',
        'content="Mucyan,technology company,software development,intelligent applications,data services,systems integration,Zibo"',
      )
      .replace('content="zh_CN"', 'content="en_US"');
  }

  html = html
    .replaceAll("__SITE_ORIGIN__", origin)
    .replaceAll("__SITE_CANONICAL__", `${origin}${isEnglish ? "/en/" : "/"}`);
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/en") {
      return Response.redirect(new URL(`/en/${url.search}`, request.url), 308);
    }

    const isPageRoute = url.pathname === "/" || url.pathname === "/en/";
    const isFileRequest = url.pathname.split("/").pop()?.includes(".") ?? false;
    if (!isPageRoute && !isFileRequest) {
      return new Response("Not Found", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8", "x-content-type-options": "nosniff" },
      });
    }

    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && isPageRoute) {
      const indexRequest = new Request(new URL("/index.html", request.url), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      return renderHtml(response, request);
    }

    const headers = new Headers(response.headers);
    headers.set("x-content-type-options", "nosniff");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
