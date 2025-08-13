<template>
  <div class="layout custom-cursor">
    <LayoutHeader />
      <main class="site-main">
        <slot />
      </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.layout{
  min-height: 100dvh; /* fallback можешь добавить: min-height: 100vh; */
  display: flex;
  flex-direction: column;
}

.custom-cursor {
  cursor: url("/cursors/cursor.png") 8 8, auto;
}


.site-main{
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center; 
  justify-content: center;
  padding: 1rem;
}
</style>
