import { useEffect } from "react";

const SITE_NAME = "Rophen Visuals";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
