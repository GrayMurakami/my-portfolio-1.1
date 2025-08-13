export function useProjectsMove() {
  const projects = ref([
    { title: '3D_Calculator', image: '/images/project1.jpg', link: 'https://graymurakami.github.io/3D_Calculator/', github: 'https://github.com/GrayMurakami/3D_Calculator' },
    { title: 'Coffee_Break', image: '/images/project2.jpg', link: 'https://graymurakami.github.io/Coffee_Break/', github: 'https://github.com/GrayMurakami/Coffee_Break' },
    { title: 'Weekly_Anime', image: '/images/project3.jpg',link: 'https://graymurakami.github.io/Weekly_Anime/', github: 'https://github.com/GrayMurakami/Weekly_Anime' },
    { title: 'Design_Form', image: '/images/project4.jpg', link: 'https://graymurakami.github.io/Design_Form/', github: 'https://github.com/GrayMurakami/Design_Form' },
    { title: 'Vue_3D_Calculator', image: '/images/project5.jpg', link: 'https://calculator-bygray.netlify.app/', github: 'https://github.com/GrayMurakami/vue-nuxt-calculator' },
    { title: 'Vue_Coffee_Break', image: '/images/project6.jpg', link: 'https://coffee-break-bygray.netlify.app/', github: 'https://github.com/GrayMurakami/vue-nuxt-coffee-break' },
    { title: 'Vue_Weekly_Anime', image: '/images/project7.jpg', link: 'https://weekly-anime-bygray.netlify.app/', github: 'https://github.com/GrayMurakami/vue-nuxt-weekly-anime' },
  ]);

  const activeIndex = ref(null);

  const setActive = (index) => {
    activeIndex.value = index;
  };

  const clearActive = () => {
    activeIndex.value = null;
  };

  return {
    projects,
    activeIndex,
    setActive,
    clearActive,
  };
}