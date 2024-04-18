import { Head } from "$fresh/runtime.ts"

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <h1 class="text-4xl font-bold">404 - Page not found</h1>
        <p class="my-4">
          The page you were looking for doesn't exist.
        </p>
        <a href="/">Go back home</a>
      </div>
    </>
  )
}
