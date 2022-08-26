import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { SearchCategory } from '@api/endpoints/search';

export const searchCaetgoryAtom = atom({
  key: 'search/category',
  default: SearchCategory.ALL,
})

const useSearchCategory = () => {
  const [searchCategory, setSearchCategory] = useRecoilState(searchCaetgoryAtom);
  const resetSearchCategory = useResetRecoilState(searchCaetgoryAtom)

  return {
    searchCategory,
    setSearchCategory,
    resetSearchCategory,
  }
}

export default useSearchCategory;