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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-current text-black dark:text-white" fillRule="evenodd" clipRule="evenodd" d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2ZM3.91579 16C3.91579 9.32607 9.32607 3.91579 16 3.91579C18.9122 3.91579 21.5838 4.94593 23.6702 6.6617C20.807 6.82594 17.306 7.14438 14.3458 7.76281C12.5277 8.14262 10.8297 8.65183 9.60184 9.35679C8.40141 10.046 7.33295 11.1288 7.57451 12.6839C7.70816 13.5443 8.26671 14.1031 8.93284 14.4288C9.55949 14.7352 10.3327 14.8678 11.1109 14.9255C12.4447 15.0244 14.1047 14.918 15.713 14.8148C15.9836 14.7975 16.2528 14.7802 16.5187 14.764C18.4344 14.6475 20.184 14.5867 21.4442 14.8342C22.07 14.9571 22.4665 15.1373 22.6939 15.333C22.8806 15.4938 23 15.7004 23 16.0737C23 16.4826 22.8784 16.6943 22.7245 16.8395C22.5389 17.0146 22.2077 17.1818 21.6563 17.2928C20.5351 17.5184 18.9438 17.433 17.1277 17.2616C16.7431 17.2253 16.3491 17.1852 15.9513 17.1447L15.9512 17.1447C14.5418 17.0012 13.0847 16.8529 11.8321 16.8515C11.0229 16.8506 10.2322 16.9091 9.54661 17.0935C8.86407 17.2772 8.18092 17.6145 7.73592 18.2512C7.29968 18.8754 7.12452 19.5777 7.2997 20.2958C7.46435 20.9707 7.90599 21.5226 8.41455 21.9642C9.42223 22.8393 11.0172 23.5595 12.7713 24.148C15.6823 25.1248 19.3516 25.8407 22.449 26.2214C20.5828 27.4013 18.3712 28.0842 16 28.0842C9.32607 28.0842 3.91579 22.6739 3.91579 16ZM24.5738 24.5158C26.7436 22.3313 28.0842 19.3222 28.0842 16C28.0842 13.1623 27.1061 10.553 25.4686 8.49099C22.4172 8.61779 18.1654 8.922 14.7375 9.63812C12.9768 10.006 11.5171 10.4663 10.5557 11.0182C9.56686 11.586 9.41442 12.0475 9.4676 12.3898C9.48131 12.4781 9.5157 12.5813 9.77436 12.7077C10.0725 12.8535 10.556 12.9633 11.2526 13.015C12.442 13.1032 13.9437 13.0075 15.5661 12.9042L15.567 12.9042C15.8423 12.8866 16.1211 12.8689 16.4024 12.8518C18.2721 12.738 20.2712 12.6514 21.8134 12.9543C22.5887 13.1066 23.3568 13.3759 23.9437 13.881C24.5712 14.4212 24.9158 15.1667 24.9158 16.0737C24.9158 16.945 24.6216 17.6835 24.0393 18.2329C23.4887 18.7524 22.7636 19.0242 22.0341 19.1709C20.5934 19.4608 18.7247 19.3367 16.9476 19.1689C16.5245 19.129 16.1047 19.0863 15.6909 19.0443L15.6905 19.0442C14.2991 18.9029 12.9766 18.7686 11.8299 18.7673C11.0922 18.7665 10.4939 18.8226 10.0443 18.9436C9.59164 19.0653 9.3933 19.2241 9.30619 19.3487C9.13087 19.5996 9.13721 19.7447 9.1609 19.8418C9.19512 19.982 9.32004 20.2132 9.67069 20.5177C10.3814 21.1349 11.6755 21.7596 13.3807 22.3318C16.7481 23.4616 21.2682 24.2425 24.5525 24.5138C24.5596 24.5144 24.5667 24.515 24.5738 24.5158Z" fill="black" />
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
