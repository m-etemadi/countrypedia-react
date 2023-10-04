import { CountriesProvider } from '../context/CountriesContext';
import { CountriesListProvider } from '../context/CountriesListContext';
import Header from './Header/Header';
import Logo from './Header/Logo';
import Search from './Header/Search';
import Main from './Main';
import LeftColumn from './LeftColumn/LeftColumn';
import SortMenu from './LeftColumn/SortMenu';
import CountriesList from './LeftColumn/CountriesList';
import RightColumn from './RightColumn/RightColumn';
import Country from './RightColumn/Country/Country';

export default function App() {
  return (
    <CountriesProvider>
      <Header>
        <Logo />
        <Search />
      </Header>
      <Main>
        <LeftColumn>
          <CountriesListProvider>
            <SortMenu />
            <CountriesList />
          </CountriesListProvider>
        </LeftColumn>
        <RightColumn>
          <Country />
        </RightColumn>
      </Main>
    </CountriesProvider>
  );
}
