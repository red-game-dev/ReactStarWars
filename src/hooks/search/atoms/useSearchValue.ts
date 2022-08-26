import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export const searchValueAtom = atom({
  key: 'search/value',
  default: '',
})

const useSearchValue = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);
  const resetSearchValue = useResetRecoilState(searchValueAtom)

  return {
    searchValue,
    setSearchValue,
    resetSearchValue,
  }
}

export default useSearchValue;