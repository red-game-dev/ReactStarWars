import { useEffect } from 'react';
import { Link, useRoutes, useLocation } from "react-router-dom";
import { Menu, Layout } from 'antd';
import './App.css';
import useShowBackButton from '@hooks/backButton/atoms/useShowBackButton';
import RoutesList from '@plugins/routing';

const { Header, Content, Footer } = Layout;

function App() {
  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  let element = useRoutes(RoutesList);

  const location = useLocation();
  const { showBackButton, setShowBackButton } = useShowBackButton();

  useEffect(() => {
    setShowBackButton(!location.pathname.includes("/search") && location.pathname !== "/")
  }, [location, setShowBackButton])

  const menuItems = [{
    key: 0,
    label: (
      showBackButton && <Link to="" onClick={() => window.history.back()}>Back</Link>  
    ),
  }]

  return (
    <Layout className="layout">
      <Header style={{
          position: 'fixed',
          zIndex: 100,
          width: '100%',
      }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={menuItems}
        />
      </Header>
      <Content 
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
        }}
      >
        <div         
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          {element}
        </div>
      </Content>
      <Footer style={{ 
        textAlign: 'center' 
      }}>Redeemer Pace ©2022 Created by Red.mt</Footer>
    </Layout>
  );
}

export default App;