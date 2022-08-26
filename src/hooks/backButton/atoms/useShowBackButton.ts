import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export const showBackButtonAtom = atom({
  key: 'backbutton/visibility',
  default: false,
})

const useShowBackButton = () => {
  const [showBackButton, setShowBackButton] = useRecoilState(showBackButtonAtom);
  const resetShowBackButton = useResetRecoilState(showBackButtonAtom)

  return {
    showBackButton,
    setShowBackButton,
    resetShowBackButton,
  }
}

export default useShowBackButton;