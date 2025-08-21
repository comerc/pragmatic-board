import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bindAll } from 'bind-event-listener'
import { Code, PanelTopClose, PanelTopOpen, Settings, Zap } from 'lucide-react'
import { SettingsContext } from '@/shared/settings-context'
import { FPSPanel } from './fps-panel'
import { SettingsDialog } from './settings-dialog'

type TRoute = { title: string; href: string }

const routes = {
  board: { title: 'Board', href: '/board' },
  oneColumn: { title: 'One Column', href: '/one-column' },
  twoColumns: { title: 'Two Columns', href: '/two-columns' },
} as const satisfies { [key: string]: TRoute }

const TopBar: React.FC = () => {
  const [isTopBarExpanded, setIsTopBarExpanded] = useState<boolean>(true)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState<boolean>(false)
  const settingsDialogRef = useRef<HTMLDivElement | null>(null)
  const settingsTriggerRef = useRef<HTMLButtonElement | null>(null)
  const { settings } = useContext(SettingsContext)

  useEffect(() => {
    return bindAll(window, [
      {
        type: 'keydown',
        listener(event) {
          if (event.key !== 'Escape') {
            return
          }

          if (isSettingsDialogOpen) {
            setIsSettingsDialogOpen(false)
            return
          }
          setIsTopBarExpanded((current) => !current)
        },
      },
      {
        type: 'click',
        listener(event) {
          if (!(event.target instanceof Element)) {
            return
          }

          if (!isSettingsDialogOpen) {
            return
          }

          const dialog = settingsDialogRef.current
          const trigger = settingsTriggerRef.current
          if (!dialog || !trigger) {
            return
          }
          if (trigger.contains(event.target)) {
            return
          }

          if (dialog.contains(event.target)) {
            return
          }

          setIsSettingsDialogOpen(false)
        },
      },
    ])
  }, [isTopBarExpanded, isSettingsDialogOpen])

  return (
    <>
      {isTopBarExpanded ? (
        <header className="flex h-12 flex-row items-center gap-1 border-b bg-sky-800 px-3">
          {Object.values(routes).map((route) => (
            <Link
              to={route.href}
              key={route.href}
              className={`flex-shrink rounded p-2 text-sm font-bold leading-none text-white hover:bg-sky-700 active:bg-sky-600 sm:text-base sm:leading-none ${location.pathname === route.href ? 'bg-blue-900' : ''}`}
            >
              {route.title}
            </Link>
          ))}
        </header>
      ) : null}
      <div className="fixed right-2 top-0 isolate z-[1] flex h-12 flex-row items-center justify-center gap-1">
        {settings.isFPSPanelEnabled ? <FPSPanel /> : null}
        {isTopBarExpanded ? (
          <>
            <a
              href="https://github.com/alexreardon/pragmatic-board"
              className="flex h-8 flex-row items-center gap-1 rounded bg-slate-800 px-2 text-white hover:bg-gray-700 active:bg-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code size={16} />
              <span className="hidden sm:block">Code</span>
            </a>
            <a
              href="https://stackblitz.com/~/github.com/alexreardon/pragmatic-board"
              className="flex h-8 flex-row items-center gap-1 rounded bg-slate-800 px-2 text-white hover:bg-gray-700 active:bg-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Zap size={16} />
              <span className="hidden sm:block">Run</span>
            </a>
          </>
        ) : null}
        <button
          type="button"
          className="rounded p-2 text-white hover:bg-sky-700 active:bg-sky-600"
          onClick={() => setIsTopBarExpanded((current) => !current)}
          aria-label="toggle top bar visibility"
        >
          {isTopBarExpanded ? <PanelTopClose size={16} /> : <PanelTopOpen size={16} />}
        </button>
        <button
          type="button"
          ref={settingsTriggerRef}
          className="rounded p-2 text-white hover:bg-sky-700 active:bg-sky-600"
          onClick={() => setIsSettingsDialogOpen((current) => !current)}
          aria-label="toggle top bar visibility"
        >
          <Settings size={16} />
        </button>
        {isSettingsDialogOpen ? <SettingsDialog ref={settingsDialogRef} /> : null}
      </div>
    </>
  )
}

export default TopBar
