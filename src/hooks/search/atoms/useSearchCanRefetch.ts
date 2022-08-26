import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export const searchCanRefetchAtom = atom({
  key: 'search/refetch',
  default: false,
})

const useSearchSearchCanRefetch = () => {
  const [searchCanRefetch, setSearchCanRefetch] = useRecoilState(searchCanRefetchAtom);
  const resetSearchCanRefetch = useResetRecoilState(searchCanRefetchAtom)

  return {
    searchCanRefetch,
    setSearchCanRefetch,
    resetSearchCanRefetch,
  }
}

export default useSearchSearchCanRefetch;