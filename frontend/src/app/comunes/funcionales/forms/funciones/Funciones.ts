export const changeUi = (): void => {
  const controls = document.getElementById('controls');
  const form = document.getElementById('container');

  if (!controls || !form) return;

  // Controlamos las rotaciones detectando en que estado se encuentra la propiedad flex-direction
  if (form.style.flexDirection === 'row') {
    form.style.flexDirection = 'column-reverse';
    controls.style.flexDirection = 'row';
    return;
  }

  if (form.style.flexDirection === 'column-reverse') {
    form.style.flexDirection = 'row-reverse';
    controls.style.flexDirection = 'column';
    return;
  }

  if (form.style.flexDirection === 'row-reverse') {
    form.style.flexDirection = 'column';
    controls.style.flexDirection = 'row';
    return;
  }

  form.style.flexDirection = 'row';
  controls.style.flexDirection = 'column';
};
