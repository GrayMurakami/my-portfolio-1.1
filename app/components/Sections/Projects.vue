<script setup>
import { useProjectsMove } from '~/composables/useProjectsMove';

const { projects, activeIndex, setActive, clearActive} = useProjectsMove();

const handleClickOutside = (e) => {
  if (!e.target.closest('.item')) {
    clearActive();
  }
};

const handleLabelClick = (e, githubLink) => {
  e.stopPropagation();
  window.open(githubLink, "_blank");
  clearActive();
};

const handleProjectClick = (e, index, project) => {
  e.stopPropagation();
  if (activeIndex.value === index) {
    window.open(project.link, "_blank");
  } else {
    setActive(index);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="wrapper">
    <div class="items cursor-pointer">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="item"
        :class="{ active: activeIndex === index }"
        tabindex="0"
        :style="{ backgroundImage: `url(${project.image})` }"
        @click.stop="handleProjectClick($event, index, project)"
      >
        <div class="labels" v-if="activeIndex === index">
          <a
            class="text text--code"
            href="javascript:void(0)"
            title="Open code on GitHub"
            @click="handleLabelClick($event, project.github)"
          >
            <img
              src="/cursors/source-code.png"
              alt="tag"
            >
            Source code
          </a>
        </div>
      </div>
    </div>

    <nav class="snap-dots" aria-label="Navi">
      <a
        v-for="(_, i) in projects"
        :key="`dot-${i}`"
        class="dot"
        :class="{ active: i === visibleIndex }"
        :href="`#proj-${i}`"
        :aria-label="`To progect ${i + 1}`"
      />
    </nav>
  </div>
</template>

<style scoped>
:host { 
  overflow: hidden; 
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.items {
  display: flex;
  gap: 0.5rem;
  perspective: calc(var(--index) * 35);
  max-width: 100%;
}

.item {
  position: relative;
  width: calc(var(--index) * 3);
  height: calc(var(--index) * 12);
  max-width: 90vw;
  background-color: #222;
  background-size: cover;
  background-position: center;
  filter: grayscale(1) brightness(0.5);
  transition: transform 1.25s var(--transition), filter 3s var(--transition), width 1.25s var(--transition);
  will-change: transform, filter, rotateY, width;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 20px;
    right: calc(var(--index) * -1);
  }

  &::after {
    left: calc(var(--index) * -1);
  }

  &:hover {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 10));
  }

  &:active,
  &:focus {
    width: 28vw;
    filter: inherit;
    z-index: 100;
    transform: translateZ(calc(var(--index) * 10));
    margin: 0.45vw;
  }

  &.active {
    border: 1.5px solid #4F0E1C;

    .text {
      display: block;
    }
  }

  .labels {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;
    position: absolute;
    bottom: 10px;
    left: 16px;
    right: 16px;
    display: flex;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .text {
    font-size: 15px;
    text-decoration: none;
    user-select: none;
    padding: 3px 7px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,.15);
    text-shadow: none;
    transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
  }

  .text--code {
    color: #fff;
    background: rgba(20,20,20,.9);
    border-color: rgba(255,255,255,.2);

    & > img {
      width: 15px;
      height: 15px;
      margin: 0 1px 2px 0;
      vertical-align: middle;
    }
  }

  .text:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0,0,0,.18);
  }
}

.items {
  & .item:hover + * {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(35deg);
    z-index: -1;
  }

  & .item:hover + * + * {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(40deg);
    z-index: -2;
  }

  & .item:hover + * + * + * {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(30deg);
    z-index: -3;
  }

  & .item:hover + * + * + * + * {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 0.6)) rotateY(15deg);
    z-index: -4;
  }

  & .item:has(+ :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(-35deg);
  }

  & .item:has(+ * + :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(-40deg);
  }

  & .item:has(+ * + * + :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(-30deg);
  }

  & .item:has(+ * + * + * + :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 0.6)) rotateY(-15deg);
  }
}


@media (max-width: 768px) {
  :root {
    --dot: rgba(255,255,255,.38);
    --dot-active: rgba(255,255,255,.95);
    --card-radius: 14px;
    --card-shadow: 0 10px 30px rgba(0,0,0,.18);
  }

  .items {
    gap: .35rem;
    padding: 0 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    perspective: 600px;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scroll-padding-inline: 16px;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }

    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%);
            mask-image: linear-gradient(90deg, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%);
  }

  .item {
    flex: 0 0 auto;
    width: 36vw;
    height: 56vw;
    max-width: none;
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    background-size: cover;
    background-position: center;
    transition: transform .45s var(--transition), width .45s var(--transition), filter .45s var(--transition);
    scroll-snap-align: center;
    scroll-snap-stop: always;
    scroll-margin-inline: 10px;
    filter: grayscale(.15) brightness(.96) contrast(1.02);
  }

  .item:hover { transform: none; }

  .item:active,
  .item:focus {
    width: 60vw;
    margin: 0 .5rem;
    transform: none;
    outline: none;
  }

  .item .labels {
    bottom: 8px;
    left: 10px;
    right: 10px;
    gap: .4rem;
  }
  .item .text {
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 12px;
  }
  .item .text--code img {
    width: 14px;
    height: 14px;
    margin: 0 4px 0 0;
    vertical-align: middle;
  }

  .snap-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 12px 0 2px;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  .snap-dots .dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: var(--dot);
    transition: transform .25s ease, background-color .25s ease, box-shadow .25s ease;

    &::after {
      content: "";
      position: absolute;
      inset: -10px;
    }

    &:active,
    &:focus-visible {
      transform: scale(1.25);
      background: var(--dot-active);
      box-shadow: 0 0 0 6px rgba(255,255,255,.18);
      outline: none;
    }
  }

  .wrapper:has(.items:target) .snap-dots .dot { background: var(--dot); }
  .snap-dots:has(a:focus) .dot { background: var(--dot); }
}

@media (hover: none), (pointer: coarse) {
  .items .item:hover + *,
  .items .item:hover + * + *,
  .items .item:hover + * + * + *,
  .items .item:hover + * + * + * + *,
  .items .item:has(+ :hover),
  .items .item:has(+ * + :hover),
  .items .item:has(+ * + * + :hover),
  .items .item:has(+ * + * + * + :hover) {
    transform: none !important;
    z-index: auto !important;
    filter: inherit !important;
  }
}
</style>