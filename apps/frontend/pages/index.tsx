import { MainLayout } from '@components/templates';
import { HomePage } from '@features/HomePage/HomePage.component';
import { HomeContextProvider } from '../features/HomePage/contexts/home.context';

export default function Index() {
  return (
    <HomeContextProvider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </HomeContextProvider>
  );
}
