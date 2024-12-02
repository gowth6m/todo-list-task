import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import BaseLayout from 'src/layouts/base-layout';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/404'));
const IndexPage = lazy(() => import('src/pages/index'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <BaseLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </BaseLayout>
    ),
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      { path: '404', element: <Page404 /> },
    ],
  },
];
