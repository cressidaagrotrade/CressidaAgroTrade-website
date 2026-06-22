/* ===========================================================
   CRESSIDA AGROTRADE — SITE SCRIPT
   Handles: sticky header, mobile nav, smooth scroll,
   reveal-on-scroll, stat counters, commodity filtering,
   inquiry modal (WhatsApp / email), certificate modal,
   contact form (mailto), toast notifications.
   =========================================================== */
(function(){
  "use strict";

  var PHONE = "2348152309634";
  var EMAIL = "cressidagroup58@gmail.com";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------
     STICKY HEADER
     ----------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader(){
    if(window.scrollY > 24){
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* -----------------------------------------------------------
     MOBILE NAV TOGGLE
     ----------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var navBackdrop = document.getElementById("mobileNavBackdrop");

  function openNav(){
    mainNav.classList.add("is-open");
    navBackdrop.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }
  function closeNav(){
    mainNav.classList.remove("is-open");
    navBackdrop.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }
  navToggle.addEventListener("click", function(){
    if(mainNav.classList.contains("is-open")){ closeNav(); } else { openNav(); }
  });
  navBackdrop.addEventListener("click", closeNav);
  mainNav.querySelectorAll("a").forEach(function(link){
    link.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") closeNav();
  });

  /* -----------------------------------------------------------
     SMOOTH SCROLL (offset for sticky header)
     ----------------------------------------------------------- */
  var HEADER_OFFSET = 84;

  function scrollToHash(hash){
    var target = document.querySelector(hash);
    if(!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - (HEADER_OFFSET - 8);
    window.scrollTo({ top: top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    var hash = link.getAttribute("href");
    if(!hash || hash === "#" || hash.length < 2) return;
    link.addEventListener("click", function(e){
      var target = document.querySelector(hash);
      if(target){
        e.preventDefault();
        scrollToHash(hash);
        history.pushState(null, "", hash);
      }
    });
  });

  /* -----------------------------------------------------------
     REVEAL ON SCROLL
     ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !prefersReducedMotion){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, i){
        if(entry.isIntersecting){
          var el = entry.target;
          setTimeout(function(){ el.classList.add("is-visible"); }, (i % 4) * 70);
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* -----------------------------------------------------------
     STAT COUNTERS
     ----------------------------------------------------------- */
  var counters = document.querySelectorAll(".manifest-num");
  function animateCounter(el){
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if(prefersReducedMotion){
      el.textContent = target + suffix;
      return;
    }
    var duration = 1300;
    var start = null;
    function step(timestamp){
      if(!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(eased * target);
      el.textContent = value + suffix;
      if(progress < 1){ requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }
  if(counters.length){
    if("IntersectionObserver" in window){
      var counterObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function(el){ counterObserver.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* -----------------------------------------------------------
     COMMODITY FILTER TABS
     ----------------------------------------------------------- */
  var filterTabs = document.querySelectorAll(".filter-tab");
  var commodityCards = document.querySelectorAll(".commodity-card");

  filterTabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      filterTabs.forEach(function(t){
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      var filter = tab.getAttribute("data-filter");
      commodityCards.forEach(function(card){
        var match = (filter === "all") || (card.getAttribute("data-category") === filter);
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* -----------------------------------------------------------
     GENERIC MODAL OPEN / CLOSE
     ----------------------------------------------------------- */
  var activeModal = null;
  var lastFocusedEl = null;

  function openModal(modal){
    if(!modal) return;
    activeModal = modal;
    lastFocusedEl = document.activeElement;
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".modal-close");
    if(closeBtn) closeBtn.focus();
  }
  function closeModal(modal){
    if(!modal) return;
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeModal = null;
    if(lastFocusedEl && typeof lastFocusedEl.focus === "function"){
      lastFocusedEl.focus();
    }
  }

  document.querySelectorAll("[data-modal-close]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var modal = btn.closest(".modal-overlay");
      closeModal(modal);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach(function(overlay){
    overlay.addEventListener("click", function(e){
      if(e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && activeModal){ closeModal(activeModal); }
  });

  /* -----------------------------------------------------------
     INQUIRY MODAL — context-aware prefill
     ----------------------------------------------------------- */
  var inquiryModal = document.getElementById("inquiryModal");
  var imTitle = document.getElementById("inquiryModalTitle");
  var imEyebrow = document.getElementById("inquiryModalEyebrow");
  var imSub = document.getElementById("inquiryModalSub");
  var imMessage = document.getElementById("im-message");
  var imName = document.getElementById("im-name");
  var imCompany = document.getElementById("im-company");
  var imEmail = document.getElementById("im-email");

  var INQUIRY_CONFIG = {
    sourcing: {
      eyebrow: "Trade Inquiry",
      title: "Start a Sourcing Partnership",
      sub: "Tell us which commodities you need and your target volumes — we\u2019ll route it to the right person on our trade desk.",
      message: "Hello Cressida AgroTrade team,\n\nI would like to discuss a sourcing partnership for the following commodity/commodities:\n\nEstimated volume / frequency:\nDestination country:\n\n"
    },
    commodity: {
      eyebrow: "Commodity Inquiry",
      title: "Request Commodity Details",
      sub: "Share your specification and target volume — we\u2019ll send back full export details.",
      message: "Hello Cressida AgroTrade team,\n\nI would like more details on: {commodity}\n\nTarget volume:\nDestination country:\nPreferred Incoterm (e.g. FOB, CIF):\n\n"
    },
    logistics: {
      eyebrow: "Logistics Inquiry",
      title: "Discuss Logistics Requirements",
      sub: "Tell us your origin point, port of destination, and shipment timing.",
      message: "Hello Cressida AgroTrade team,\n\nI would like to discuss logistics and export coordination for the following shipment:\n\nCommodity:\nVolume:\nPort of destination:\nTarget shipping window:\n\n"
    },
    general: {
      eyebrow: "Trade Inquiry",
      title: "Contact Our Trade Desk",
      sub: "Tell us a little about what you need — we\u2019ll route it to the right person on our trade desk.",
      message: "Hello Cressida AgroTrade team,\n\n"
    }
  };

  document.querySelectorAll("[data-modal-open]").forEach(function(trigger){
    trigger.addEventListener("click", function(){
      var modalId = trigger.getAttribute("data-modal-open");
      var modal = document.getElementById(modalId);

      if(modalId === "inquiryModal"){
        var type = trigger.getAttribute("data-inquiry-type") || "general";
        var config = INQUIRY_CONFIG[type] || INQUIRY_CONFIG.general;
        var commodityName = trigger.getAttribute("data-commodity-name") || "";

        imEyebrow.textContent = config.eyebrow;
        imTitle.textContent = commodityName ? "Request Details — " + commodityName : config.title;
        imSub.textContent = config.sub;
        imMessage.value = config.message.replace("{commodity}", commodityName);
      }

      openModal(modal);
    });
  });

  function buildInquiryText(){
    var name = imName.value.trim();
    var company = imCompany.value.trim();
    var email = imEmail.value.trim();
    var message = imMessage.value.trim();

    var lines = [];
    if(message) lines.push(message);
    lines.push("");
    lines.push("— Sent from Cressida AgroTrade website —");
    if(name) lines.push("Name: " + name);
    if(company) lines.push("Company: " + company);
    if(email) lines.push("Email: " + email);

    return lines.join("\n");
  }

  document.getElementById("im-send-whatsapp").addEventListener("click", function(){
    var text = buildInquiryText();
    var url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
    showToast("Opening WhatsApp\u2026");
  });

  document.getElementById("im-send-email").addEventListener("click", function(){
    var subject = imTitle.textContent || "Trade Inquiry — Cressida AgroTrade";
    var body = buildInquiryText();
    var url = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = url;
    showToast("Opening your email app\u2026");
  });

  /* -----------------------------------------------------------
     CERTIFICATE MODAL
     ----------------------------------------------------------- */
  var certModal = document.getElementById("certModal");
  var certModalImg = document.getElementById("certModalImg");
  var certModalCaption = document.getElementById("certModalCaption");

  document.querySelectorAll("[data-cert-open]").forEach(function(trigger){
    trigger.addEventListener("click", function(){
      var src = trigger.getAttribute("data-cert-open");
      var caption = trigger.getAttribute("data-cert-caption") || "";
      certModalImg.setAttribute("src", src);
      certModalImg.setAttribute("alt", caption);
      certModalCaption.textContent = caption;
      openModal(certModal);
    });
  });

  /* -----------------------------------------------------------
     CONTACT FORM — mailto submission
     ----------------------------------------------------------- */
  var contactForm = document.getElementById("contactForm");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();

      var name = document.getElementById("cf-name").value.trim();
      var company = document.getElementById("cf-company").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      var interest = document.getElementById("cf-interest").value;
      var message = document.getElementById("cf-message").value.trim();

      if(!name || !email || !message){
        showToast("Please fill in your name, email, and message.");
        return;
      }

      var subject = "Trade Inquiry (" + interest + ") — " + name;
      var bodyLines = [
        message,
        "",
        "— Sent from Cressida AgroTrade website —",
        "Name: " + name,
        company ? ("Company: " + company) : null,
        "Email: " + email,
        "Interest: " + interest
      ].filter(Boolean);

      var url = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyLines.join("\n"));
      window.location.href = url;
      showToast("Opening your email app\u2026");
    });
  }

  /* -----------------------------------------------------------
     TOAST
     ----------------------------------------------------------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg){
    if(!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-active");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
      toastEl.classList.remove("is-active");
    }, 3200);
  }

  /* -----------------------------------------------------------
     FOOTER YEAR
     ----------------------------------------------------------- */
  var yearEl = document.getElementById("footerYear");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
