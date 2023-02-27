
import Layout from './components/Layout'
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import Homepage from './components/Homepage';


const Home: NextPageWithLayout = () => {
  return (
    <div >
      <Homepage />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
   )
}

export default Home;
