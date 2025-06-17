import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AssessmentList } from './pages/AssessmentList';
import { AssessmentDetail } from './pages/AssessmentDetail';
import { ApplicationList } from './pages/ApplicationList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assessments" element={<AssessmentList />} />
          <Route path="/assessments/:id" element={<AssessmentDetail />} />
          <Route path="/applications" element={<ApplicationList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;