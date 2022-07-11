import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    className="fill-current text-black dark:text-white"
                  />
                  <rect width="24" height="24" fill="url(#paint0_radial)" />
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(45) scale(39.598)"
                    >
                      <stop stopColor="#CFCFCF" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#E9E9E9" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2.39062C6.69289 2.39062 2.39062 6.69289 2.39062 12C2.39062 17.3071 6.69289 21.6094 12 21.6094C17.3071 21.6094 21.6094 17.3071 21.6094 12C21.6094 6.69289 17.3071 2.39062 12 2.39062ZM3.70559 12C3.70559 7.41913 7.41913 3.70559 12 3.70559C13.9989 3.70559 15.8326 4.41267 17.2647 5.59034C15.2995 5.70307 12.8964 5.92164 10.8646 6.34613C9.61668 6.60682 8.4512 6.95633 7.6084 7.44021C6.78445 7.91326 6.05108 8.6565 6.21688 9.72386C6.30862 10.3144 6.69199 10.698 7.14922 10.9216C7.57934 11.1319 8.11002 11.2229 8.6442 11.2625C9.5597 11.3304 10.6991 11.2573 11.803 11.1865C11.9888 11.1746 12.1735 11.1627 12.356 11.1516C13.671 11.0717 14.8719 11.0299 15.7368 11.1998C16.1664 11.2842 16.4385 11.4079 16.5946 11.5422C16.7227 11.6525 16.8047 11.7944 16.8047 12.0506C16.8047 12.3312 16.7212 12.4766 16.6156 12.5762C16.4882 12.6964 16.2609 12.8112 15.8824 12.8874C15.1128 13.0422 14.0206 12.9836 12.774 12.8659C12.5101 12.841 12.2396 12.8135 11.9666 12.7857L11.9665 12.7857C10.9991 12.6872 9.99898 12.5854 9.1392 12.5845C8.58378 12.5838 8.04104 12.624 7.57049 12.7506C7.10201 12.8766 6.63311 13.1082 6.32767 13.5452C6.02824 13.9736 5.90801 14.4557 6.02825 14.9486C6.14127 15.4118 6.4444 15.7906 6.79347 16.0937C7.48513 16.6944 8.57989 17.1887 9.78385 17.5927C11.782 18.2631 14.3005 18.7545 16.4265 19.0158C15.1456 19.8256 13.6275 20.2944 12 20.2944C7.41913 20.2944 3.70559 16.5809 3.70559 12ZM17.8849 17.8451C19.3742 16.3457 20.2944 14.2803 20.2944 12C20.2944 10.0522 19.623 8.26129 18.4991 6.84594C16.4047 6.93297 13.4863 7.14178 11.1335 7.6333C9.92492 7.88578 8.92303 8.20172 8.26313 8.58059C7.5844 8.97027 7.47977 9.28706 7.51626 9.52202C7.52568 9.58262 7.54928 9.65343 7.72682 9.74024C7.93146 9.8403 8.26333 9.91565 8.74145 9.95111C9.55783 10.0117 10.5886 9.94602 11.7022 9.8751L11.7028 9.87506C11.8917 9.86303 12.0831 9.85085 12.2762 9.8391C13.5596 9.76104 14.9317 9.70161 15.9902 9.90948C16.5224 10.014 17.0496 10.1989 17.4524 10.5456C17.8831 10.9163 18.1197 11.428 18.1197 12.0506C18.1197 12.6487 17.9177 13.1555 17.518 13.5326C17.1402 13.8892 16.6424 14.0757 16.1417 14.1765C15.1529 14.3754 13.8702 14.2902 12.6504 14.1751C12.36 14.1477 12.0718 14.1184 11.7878 14.0896L11.7876 14.0895C10.8325 13.9925 9.92478 13.9003 9.13772 13.8994C8.63133 13.8989 8.22074 13.9374 7.9121 14.0204C7.6014 14.104 7.46526 14.213 7.40548 14.2985C7.28514 14.4707 7.28949 14.5703 7.30575 14.6369C7.32924 14.7332 7.41498 14.8919 7.65567 15.1009C8.14351 15.5245 9.03172 15.9533 10.2021 16.346C12.5135 17.1215 15.616 17.6575 17.8703 17.8437C17.8752 17.8441 17.8801 17.8446 17.8849 17.8451Z" fill="black" />
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
