import { CountriesProvider } from '../context/CountriesContext';
import { CountriesListProvider } from '../context/CountriesListContext';
import { NeighboursProvider } from '../context/NeighboursContext';
import Header from './Header/Header';
import Logo from './Header/Logo';
import Search from './Header/Search';
import Main from './Main';
import LeftColumn from './LeftColumn/LeftColumn';
import SortMenu from './LeftColumn/SortMenu';
import CountriesList from './LeftColumn/CountriesList';
import RightColumn from './RightColumn/RightColumn';
import Country from './RightColumn/Country/Country';
import RowOne from './RightColumn/Country/RowOne';
import RowTwo from './RightColumn/Country/RowTwo';
import RowThree from './RightColumn/Country/RowThree';
import RowFour from './RightColumn/Country/RowFour';
import Map from './RightColumn/Country/Map';
import Neighbours from './RightColumn/Neighbours/Neighbours';

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
          <Country>
            <RowOne />
            <RowTwo />
            <RowThree />
            <RowFour />
            <Map />
            <NeighboursProvider>
              <Neighbours />
            </NeighboursProvider>
          </Country>
        </RightColumn>
      </Main>
    </CountriesProvider>
  );
}
