$(() => {
  // 回到顶部
  function toTop() {
    var $toTop = $(".gotop");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= $(window).height()) {
        $toTop.css("display", "block").fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on("click", function (evt) {
      var $obj = $("body,html");
      $obj.animate(
        {
          scrollTop: 0,
        },
        240
      );

      evt.preventDefault();
    });
  }

  toTop();

  //**********************************************
  // theme toggler start
  const { log } = $.withTags("theme");
  const $themeSwitchWrap = $(".theme-switch-wrap");
  const $autoWrap = $themeSwitchWrap.find(".auto-wrap");
  const $switchWrap = $themeSwitchWrap.find(".switch-wrap");
  const $root = $(":root");
  const $codeLink = $("#code-theme");
  const CACHE_THEME_KEY = "app-theme-key";
  const ATTR_LIGHT = "theme-light";
  const ATTR_DARK = "theme-dark";

  const updateStyle = (isAuto, theme) => {
    if (isAuto) {
      $root.removeAttr(ATTR_DARK).removeAttr(ATTR_LIGHT);
    } else {
      if (theme === "dark") {
        $root.attr(ATTR_DARK, "").removeAttr(ATTR_LIGHT);
      } else {
        $root.attr(ATTR_LIGHT, "").removeAttr(ATTR_DARK);
      }
    }
    $codeLink.attr("href", `/assets/styles/hightlight/github.${theme}.css`);
  };

  const checkPrefersColorScheme = (theme) =>
    window.matchMedia(`(prefers-color-scheme: ${theme})`).matches;

  const toggleAutoTheme = (isAuto) => {
    const old = $.cache.session(CACHE_THEME_KEY) || {};
    let theme = old.theme;
    var isDarkMode = checkPrefersColorScheme("dark");
    if (isAuto) {
      $autoWrap.addClass("checked");
      $switchWrap.addClass("disabled");

      updateStyle(true, isDarkMode ? "dark" : "light");
      $.cache.session(CACHE_THEME_KEY, {
        theme,
        isAuto,
      });
      log("toggle to auto");
    } else {
      if (isDarkMode) {
        toggleLightTheme();
      } else {
        toggleDarkTheme();
      }
    }
  };

  const toggleDarkTheme = () => {
    $autoWrap.removeClass("checked");
    $switchWrap.removeClass("disabled");

    $switchWrap.addClass("checked");

    updateStyle(false, "dark");
    $.cache.session(CACHE_THEME_KEY, { isAuto: false, theme: "dark" });

    log("toggle to dark mode");
  };

  const toggleLightTheme = () => {
    $autoWrap.removeClass("checked");
    $switchWrap.removeClass("disabled");

    $switchWrap.removeClass("checked");

    updateStyle(false, "light");
    $.cache.session(CACHE_THEME_KEY, { isAuto: false, theme: "light" });
    log("toggle to light mode");
  };

  const old = $.cache.session(CACHE_THEME_KEY) || {};

  if (old?.isAuto) {
    toggleAutoTheme(true);
  } else {
    if (old.theme === "dark") {
      toggleDarkTheme();
    } else {
      toggleLightTheme();
    }
  }
  $autoWrap.on("click", (e) => {
    const isChecked = $autoWrap.is(".checked");

    toggleAutoTheme(!isChecked);
  });
  $switchWrap.on("click", (e) => {
    const isDisabled = $switchWrap.is(".disabled");
    if (isDisabled) return;
    const isChecked = $switchWrap.is(".checked");

    if (isChecked) {
      toggleLightTheme();
    } else {
      toggleDarkTheme();
    }
  });

  const observeMediaChange = (mqStr, listener) => {
    const mqList = window.matchMedia(mqStr);

    mqList.addEventListener("change", listener);

    return () => mqList.removeEventListener("change", listener);
  };

  $(window).on(
    "unload",
    observeMediaChange("(prefers-color-scheme: dark)", (event) => {
      const old = $.cache.session(CACHE_THEME_KEY) || {};
      if (!old.isAuto) return;
      log("(prefers-color-scheme: dark) system changed");
      // is dark mode
      if (event.matches) {
        $switchWrap.removeClass("checked");
        $.cache.session(CACHE_THEME_KEY, { isAuto: true, theme: "light" });
      } else {
        $switchWrap.addClass("checked");
        $.cache.session(CACHE_THEME_KEY, { isAuto: true, theme: "dark" });
      }
    })
  );

  // theme toggler end
  //**********************************************
});
