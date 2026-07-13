<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { siteContent, type Locale } from "./content";

const locale = ref<Locale>(/^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : "zh");
const copy = computed(() => siteContent[locale.value]);
const isEnglish = computed(() => locale.value === "en");
const heroSlides = computed(() => copy.value.heroSlides);
const capabilities = computed(() => copy.value.capabilities.items);
const principles = computed(() => copy.value.approach.principles);
const navItems = computed(() => copy.value.navItems);

const activeHero = ref(0);
const isHeroInteractionPaused = ref(false);
const isHeroUserPaused = ref(false);
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const capabilityRail = ref<HTMLElement | null>(null);
const menuToggle = ref<HTMLButtonElement | null>(null);
const mobileNavigation = ref<HTMLElement | null>(null);
let heroTimer: number | undefined;
let revealObserver: IntersectionObserver | undefined;
let mobileMediaQuery: MediaQueryList | undefined;

const currentHero = computed(() => heroSlides.value[activeHero.value]);
const isHeroPaused = computed(() => isHeroInteractionPaused.value || isHeroUserPaused.value);

function setHero(index: number) {
  activeHero.value = index;
  restartHeroTimer();
}

function advanceHero() {
  activeHero.value = (activeHero.value + 1) % heroSlides.value.length;
}

function updateClientMetadata() {
  document.documentElement.lang = isEnglish.value ? "en" : "zh-CN";
  document.title = copy.value.meta.title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", copy.value.meta.description);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", copy.value.meta.title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", copy.value.meta.description);
  document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute("content", isEnglish.value ? "en_US" : "zh_CN");
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", copy.value.meta.title);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", copy.value.meta.description);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute(
    "href",
    new URL(isEnglish.value ? "/en/" : "/", window.location.origin).href,
  );
  document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute(
    "content",
    new URL(isEnglish.value ? "/en/" : "/", window.location.origin).href,
  );
}

function startHeroTimer() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    if (!isHeroPaused.value && document.visibilityState === "visible") {
      advanceHero();
    }
  }, 6500);
}

function restartHeroTimer() {
  window.clearInterval(heroTimer);
  startHeroTimer();
}

function toggleHeroPlayback() {
  isHeroUserPaused.value = !isHeroUserPaused.value;
  if (isHeroUserPaused.value) {
    window.clearInterval(heroTimer);
  } else {
    startHeroTimer();
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

function closeMenu(restoreFocus = false) {
  isMenuOpen.value = false;
  document.body.classList.remove("menu-open");
  if (restoreFocus) void nextTick(() => menuToggle.value?.focus());
}

function toggleMenu() {
  const opening = !isMenuOpen.value;
  isMenuOpen.value = opening;
  document.body.classList.toggle("menu-open", isMenuOpen.value);
  if (opening) {
    void nextTick(() => mobileNavigation.value?.querySelector<HTMLAnchorElement>("a")?.focus());
  } else {
    menuToggle.value?.focus();
  }
}

function scrollCapabilities(direction: 1 | -1) {
  if (!capabilityRail.value) return;
  const firstCard = capabilityRail.value.querySelector<HTMLElement>(".capability-card");
  const step = (firstCard?.offsetWidth ?? 360) + 24;
  capabilityRail.value.scrollBy({ left: direction * step, behavior: "smooth" });
}

function handleKeyboard(event: KeyboardEvent) {
  if (event.key === "Escape" && isMenuOpen.value) {
    closeMenu(true);
    return;
  }

  if (event.key !== "Tab" || !isMenuOpen.value || !mobileNavigation.value || !menuToggle.value) return;
  const focusable = [menuToggle.value, ...mobileNavigation.value.querySelectorAll<HTMLAnchorElement>("a")];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleMobileBreakpoint(event: MediaQueryListEvent) {
  if (!event.matches && isMenuOpen.value) closeMenu();
}

onMounted(async () => {
  updateClientMetadata();
  startHeroTimer();
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKeyboard);
  mobileMediaQuery = window.matchMedia("(max-width: 820px)");
  mobileMediaQuery.addEventListener("change", handleMobileBreakpoint);

  await nextTick();
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => revealObserver?.observe(element));
});

onBeforeUnmount(() => {
  window.clearInterval(heroTimer);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeyboard);
  mobileMediaQuery?.removeEventListener("change", handleMobileBreakpoint);
  revealObserver?.disconnect();
  document.body.classList.remove("menu-open");
});
</script>

<template>
  <div class="site-shell" :class="{ 'locale-en': isEnglish }">
    <a class="skip-link" href="#main">{{ copy.accessibility.skipLink }}</a>

    <header class="site-header" :class="{ 'is-scrolled': isScrolled, 'menu-active': isMenuOpen }">
      <div class="header-inner">
        <a class="brand" href="#top" :aria-label="copy.accessibility.homeLabel" @click="closeMenu()">
          <span class="brand-mark" aria-hidden="true">M</span>
          <span class="brand-copy">
            <strong>Mucyan</strong>
            <small>沐沧科技</small>
          </span>
        </a>

        <nav class="desktop-nav" :aria-label="copy.accessibility.primaryNav">
          <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
        </nav>

        <div class="header-meta">
          <a :href="copy.languageSwitch.href" :hreflang="copy.languageSwitch.hreflang">
            {{ copy.languageSwitch.label }}
          </a>
        </div>

        <button
          ref="menuToggle"
          class="menu-toggle"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="isMenuOpen ? copy.accessibility.closeMenu : copy.accessibility.openMenu"
          @click="toggleMenu"
        >
          <span></span><span></span>
        </button>
      </div>

      <nav
        ref="mobileNavigation"
        id="mobile-navigation"
        class="mobile-nav"
        :aria-label="copy.accessibility.mobileNav"
        :aria-hidden="!isMenuOpen"
        :inert="!isMenuOpen"
      >
        <a v-for="(item, index) in navItems" :key="item.href" :href="item.href" @click="closeMenu()">
          <span>0{{ index + 1 }}</span>{{ item.label }}
        </a>
        <a class="mobile-language" :href="copy.languageSwitch.href" :hreflang="copy.languageSwitch.hreflang" @click="closeMenu()">
          <span aria-hidden="true">↗</span>{{ copy.languageSwitch.label }}
        </a>
        <p>Mucyan · Zibo, Shandong</p>
      </nav>
    </header>

    <main id="main" :inert="isMenuOpen">
      <section
        id="top"
        class="hero"
        :class="[`theme-${currentHero.theme}`, { 'is-paused': isHeroPaused }]"
        aria-labelledby="hero-title"
        @mouseenter="isHeroInteractionPaused = true"
        @mouseleave="isHeroInteractionPaused = false"
        @focusin="isHeroInteractionPaused = true"
        @focusout="isHeroInteractionPaused = false"
      >
        <div class="hero-art" aria-hidden="true">
          <div class="orb orb-one"></div>
          <div class="orb orb-two"></div>
          <div class="signal-grid"></div>
          <div class="hero-monogram">M</div>
          <div class="hero-coordinates">36.8131° N · 118.0548° E</div>
        </div>

        <Transition name="hero-panel" mode="out-in">
          <div :key="activeHero" class="hero-panel">
            <p class="eyebrow">{{ currentHero.eyebrow }}</p>
            <h1 id="hero-title">
              {{ currentHero.title }}<br />
              <span>{{ currentHero.titleAccent }}</span>
            </h1>
            <p class="hero-description">{{ currentHero.description }}</p>
            <a class="text-link" href="#about">
              {{ copy.heroLearnMore }}
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </Transition>

        <button
          class="hero-playback"
          type="button"
          :aria-label="isHeroUserPaused ? copy.heroPlayback.play : copy.heroPlayback.pause"
          :title="isHeroUserPaused ? copy.heroPlayback.play : copy.heroPlayback.pause"
          :aria-pressed="isHeroUserPaused"
          @click="toggleHeroPlayback"
        >
          <span aria-hidden="true">{{ isHeroUserPaused ? "▶" : "Ⅱ" }}</span>
        </button>

        <div class="hero-pagination" :aria-label="copy.accessibility.heroPagination">
          <button
            v-for="(slide, index) in heroSlides"
            :key="slide.eyebrow"
            type="button"
            :class="{ active: activeHero === index }"
            :aria-label="`${copy.accessibility.heroSlidePrefix} ${index + 1}: ${slide.title} ${slide.titleAccent}`"
            :aria-current="activeHero === index ? 'true' : undefined"
            @click="setHero(index)"
          >
            <span>0{{ index + 1 }}</span>
            <i aria-hidden="true"></i>
          </button>
        </div>

      </section>

      <section id="about" class="about section-pad">
        <div class="about-shape about-shape-one" aria-hidden="true"></div>
        <div class="about-shape about-shape-two" aria-hidden="true"></div>
        <div class="content-grid" data-reveal>
          <div class="section-kicker">
            <span>01</span>
            <p>ABOUT MUCYAN</p>
          </div>
          <div class="about-copy">
            <p class="overline">{{ copy.about.overline }}</p>
            <h2>{{ copy.about.title[0] }}<br />{{ copy.about.title[1] }}</h2>
            <div class="about-body">
              <p>{{ copy.about.paragraphs[0] }}</p>
              <p>{{ copy.about.paragraphs[1] }}</p>
            </div>
          </div>
        </div>
        <div class="marquee" aria-hidden="true">
          <span>MUCYAN</span><i></i><span>{{ copy.about.marqueeMiddle }}</span><i></i><span>MAKE IT CLEAR</span>
        </div>
      </section>

      <section id="capabilities" class="capabilities section-pad">
        <div class="section-heading" data-reveal>
          <div>
            <p class="overline light">{{ copy.capabilities.overline }}</p>
            <h2>{{ copy.capabilities.title[0] }}<br />{{ copy.capabilities.title[1] }}</h2>
          </div>
          <div class="rail-controls">
            <button type="button" :aria-label="copy.accessibility.previousDirections" @click="scrollCapabilities(-1)">←</button>
            <button type="button" :aria-label="copy.accessibility.nextDirections" @click="scrollCapabilities(1)">→</button>
          </div>
        </div>

        <div ref="capabilityRail" class="capability-rail" data-reveal>
          <article v-for="item in capabilities" :key="item.index" class="capability-card">
            <div class="card-topline">
              <span>{{ item.index }}</span>
              <span>{{ item.en }}</span>
            </div>
            <div class="card-graphic" :class="`graphic-${item.index}`" aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <ul :aria-label="copy.accessibility.directionsLabel">
              <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="approach" class="approach">
        <div class="approach-visual" aria-hidden="true">
          <div class="approach-rings"></div>
          <div class="approach-core">M</div>
          <p>UNDERSTAND<br />BUILD<br />EVOLVE</p>
        </div>
        <div class="approach-content section-pad" data-reveal>
          <p class="overline">{{ copy.approach.overline }}</p>
          <h2>{{ copy.approach.title[0] }}<br />{{ copy.approach.title[1] }}</h2>
          <div class="principle-list">
            <article v-for="principle in principles" :key="principle.number">
              <span>{{ principle.number }}</span>
              <div>
                <h3>{{ principle.title }}</h3>
                <p>{{ principle.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="company" class="company section-pad">
        <div class="content-grid" data-reveal>
          <div class="section-kicker dark">
            <span>04</span>
            <p>COMPANY</p>
          </div>
          <div class="company-copy">
            <p class="overline">{{ copy.company.overline }}</p>
            <h2>{{ copy.company.title[0] }}<br />{{ copy.company.title[1] }}</h2>
          </div>
        </div>

        <div class="facts" data-reveal>
          <article v-for="fact in copy.company.facts" :key="fact.label">
            <p>{{ fact.label }}</p>
            <strong>{{ fact.value }}</strong>
            <span>{{ fact.detail }}</span>
          </article>
        </div>
      </section>

      <section id="contact" class="contact section-pad">
        <div class="contact-orb" aria-hidden="true"></div>
        <div class="contact-content" data-reveal>
          <p class="overline light">CONTACT MUCYAN</p>
          <h2>{{ copy.contact.title[0] }}<br />{{ copy.contact.title[1] }}</h2>
          <p class="contact-lead">{{ copy.contact.lead }}</p>
          <div class="contact-actions">
            <span>{{ copy.contact.email }}</span>
            <span>{{ copy.contact.phone }}</span>
          </div>
        </div>
        <div class="contact-address">
          <p>{{ copy.contact.addressLabel }}</p>
          <address>{{ copy.contact.addressLines[0] }}<br />{{ copy.contact.addressLines[1] }}</address>
        </div>
      </section>
    </main>

    <footer class="site-footer" :inert="isMenuOpen">
      <div class="footer-top">
        <a class="brand footer-brand" href="#top" :aria-label="copy.accessibility.backToTop">
          <span class="brand-mark" aria-hidden="true">M</span>
          <span class="brand-copy">
            <strong>Mucyan</strong>
            <small>沐沧科技</small>
          </span>
        </a>
        <p>Make technology clear.</p>
      </div>
      <div class="footer-nav">
        <div>
          <p>{{ copy.footer.navigation }}</p>
          <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
        </div>
        <div>
          <p>{{ copy.footer.entity }}</p>
          <span>{{ copy.footer.entityName }}</span>
          <span>{{ copy.footer.creditCode }}</span>
        </div>
        <div>
          <p>{{ copy.footer.language }}</p>
          <a href="/" hreflang="zh-CN" :aria-current="!isEnglish ? 'page' : undefined">中文简体</a>
          <a href="/en/" hreflang="en" :aria-current="isEnglish ? 'page' : undefined">English</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Mucyan. All rights reserved.</p>
        <div class="footer-legal">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
            鲁ICP备2026035323号-1
          </a>
          <span>mucyan.com</span>
        </div>
      </div>
    </footer>
  </div>
</template>
