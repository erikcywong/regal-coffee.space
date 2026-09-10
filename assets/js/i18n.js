/* FEC × NAPELL i18n — EN / ZH toggle, persisted in localStorage */
(function () {
  var KEY = "regal_lang";
  function saved() {
    try { return localStorage.getItem(KEY) || "en"; } catch (e) { return "en"; }
  }
  function apply(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    var t = document.getElementById("langToggle");
    if (t) t.textContent = lang === "zh" ? "English" : "中文";
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    window.FEC_CURRENT_LANG = lang;
    window.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  window.FEC_LANG = function () {
    return document.documentElement.getAttribute("data-lang") || "en";
  };
  window.addEventListener("DOMContentLoaded", function () {
    apply(saved());
    var btn = document.getElementById("langToggle");
    if (btn) btn.addEventListener("click", function () {
      apply(window.FEC_LANG() === "zh" ? "en" : "zh");
    });
  });
  apply(saved());
})();
