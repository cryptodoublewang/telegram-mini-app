import https from "https";
//import {APP_BUNDLE_ID_ENCODED} from '../../hooks/hooksWithContext/useAppSecurity';

export const StrapiURL = "https://api-staging.kelp.finance";
export const StrapiBaseUrl = `${StrapiURL}/api/`;
export const BscScanBaseUrl = "https://api.bscscan.com/api/";
export const CoingeckoBaseUrl = "https://api.coingecko.com/api/";
export const DefibitDataSeedUrl = "https://bsc-dataseed1.defibit.io/";
export const FrankfurterBaseUrl = "https://api.frankfurter.app/";

export const LINK_KELP_FINANCE = "https://link.kelp.finance";
export const KELP_FINANCE = "https://kelp.finance";
export const WALLETCONNECT_REQUEST_PREFIX =
  "link.kelp.finance://walletconnect/wc";
export const WALLETCONNECT_COMMON_REQUEST_PART = "wc?uri=";
export const WALLETCONNECT_REQUEST_PREFIX_2 = "wc:";
export const WALLETCONNECT_REQUEST_PREFIX_3 =
  "link.kelp.finance://walletconnect";

// export const SUPPORTED_KELP_PREFIXES = [
//   'link.kelp.finance:',
//   'exp+kelp:',
//   `${atob(APP_BUNDLE_ID_ENCODED)}:`,
//   'wc:',
// ];
export const SUPPORTED_HTTP_PREFIXES = ["http:", "https:"];

export const GLOBE_IMAGE_URL = "https://kelp.org/globe"; //"https://kelp-test.vercel.app/"

export const COINMARKETCAP_WHITELIST_REGEXS = [
  "coinmarketcap.com/community/profile/",
  "coinmarketcap.com/settings/",
  "google",
  "apple",
  "binance",
];
export const COINSCOPE_WHITELIST_REGEXS = [
  "coinscope.co/coin/1-kelp",
  "coinscope.co/login",
  "coinscope.co",
  "google",
  "twitter",
  "sentry",
  "firebaseapp.com",
];

export const httpsAgent = new https.Agent({
  ca: process.env.StrapiCertificate,
});

export const WALLET_ACCOUNT_ALREADY_EXIST_ERROR =
  "WALLET WITH GIVEN DEVICE UUID ALREADY EXISTS.";

export const KELP_ONBOARDING_VIDEO_URL =
  "https://www.youtube.com/watch?v=au6rsoXtu6E";
