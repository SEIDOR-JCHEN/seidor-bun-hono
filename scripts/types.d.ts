export type WinService = {
  name: string;
  displayName: string;
  description: string;
  status: string;
  startType: "auto" | "manual" | "disabled";
  account: {
    domain: string;
    username: string;
    password: string;
  };
  dependencies: string[];
  binaryPath: string;
  serviceType: string;
  errorControl: string;
  loadOrderGroup: string;
};
