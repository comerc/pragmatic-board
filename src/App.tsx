import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardPage from './app/board/page'
import OneColumnPage from './app/one-column/page'
import TwoColumnsPage from './app/two-columns/page'
import TopBar from './app/top-bar'
import { FathomTracker } from './app/fathom'
import { SettingsContextProvider } from './shared/settings-context'
import './app/globals.css'

const App: React.FC = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Router>
        <FathomTracker />
        <SettingsContextProvider>
          <div className="relative flex-grow">
            <div className="absolute inset-0">
              <TopBar />
              <main className="h-full bg-sky-700">
                <Routes>
                  <Route path="/board" element={<BoardPage />} />
                  <Route path="/one-column" element={<OneColumnPage />} />
                  <Route path="/two-columns" element={<TwoColumnsPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </SettingsContextProvider>
      </Router>
    </div>
  )
}

export default App
