import { useRecoilValue, useSetRecoilState } from 'recoil';
import { colorSchemeValue, colorScheme as colorSchemeStore } from '@/stores/color-scheme';
import { darkMode as darkModeStore } from '@/stores/dark-mode';
import dom from '@left4code/tw-starter/dist/js/dom';
import classnames from 'classnames';

function Main(props) {
  const darkMode = useRecoilValue(darkModeStore);
  const colorScheme = useRecoilValue(colorSchemeStore);
  const setColorSchemeValue = useSetRecoilState(colorSchemeValue);

  const setColorSchemeClass = () => {
    dom('html')
      .attr('class', colorScheme)
      .addClass(darkMode ? 'dark' : '');
  };

  const switchColorScheme = (colorScheme) => {
    setColorSchemeValue(() => colorScheme);
    localStorage.setItem('colorScheme', colorScheme);
    setColorSchemeClass();
  };

  setColorSchemeClass();

  return (
    <>
      {/* BEGIN: Main Color Switcher */}
      {/* END: Main Color Switcher */}
    </>
  );
}

export default Main;
