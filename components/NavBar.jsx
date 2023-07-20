"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();
  const [provider, setProvider] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviderData = async () => {
      const response = await getProviders();
      setProvider(response);
    };

    setProviderData();
    return () => {};
  }, []);
  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="assets/images/logo.svg"
            alt="promptopia logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">promptopia</p>
        </Link>
        {/* desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={30}
                  height={30}
                  alt="Profil-pic"
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {provider &&
                Object.values(provider).map((provider) => (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/** Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                alt="Profil-pic"
                className="rounded-full"
                onClick={() => setToggleDropdown((prevState) => !prevState)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    create Post
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {provider &&
                Object.values(provider).map((provider) => (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
