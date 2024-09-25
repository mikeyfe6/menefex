import React from 'react';

import { Link } from 'gatsby';

// import useTranslation from '../hooks/use-translation';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

import * as superPowersStyles from '../../styles/modules/superpowers.module.scss';

const MaintenancePage = () => {
  //   const { t, isHydrated } = useTranslation();

  //   if (!isHydrated) return null;

  return (
    <Layout>
      <h1 className="page-title">
        Onderhoud en <span>/</span> of updates uitvoeren
        <span>.</span>
      </h1>
      <h2 className="page-sub">
        Regelmatig onderhoud en updates om de optimale prestaties en veiligheid
        van je website of webapplicatie te garanderen. Wij zorgen ervoor dat
        alles up-to-date blijft en probleemloos
      </h2>

      <section className={superPowersStyles.powers}>
        <Link to="/diensten/">
          <i className="fa-solid fa-angles-left" /> {'Diensten'}
        </Link>
      </section>
    </Layout>
  );
};

export default MaintenancePage;

export const Head = () => (
  <SEO
    title="Onderhoud en/of updates uitvoeren"
    description=""
    keywords=""
    pathname="/onderhoud-updates-uitvoeren/"
  />
);
