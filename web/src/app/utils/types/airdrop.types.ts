export enum TaskType {
  EMAIL = "email",
  TELEGRAM = "telegram",
  INJECT = "inject",
  SOCIAL = "social",
  VIDEO = "video",
  CREDIT = "credit",
  MULTI = "multi",
  INPUT_VERIFICATION = "input_verification",
}

export enum TaskStatus {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  DISABLED = "disabled",
}

export interface AirdropTask {
  id: string;
  email?: string;
  Name: string;
  URL: string;
  DeepLinkIOS?: string;
  DeepLinkAndroid?: string;
  Points: number;
  Logo: string | any;
  Description: string;
  ActionText: string;
  Type: TaskType;
  Status: TaskStatus;
  Order: number;
  LogoColor: string;
  isCompleted: boolean;
  isDailyTask?: boolean;
  VideoLink?: string;
  LongDescription?: string;
  InjectableQuery?: string;
  changedTextContent?: string;
  inputCheckText?: string;
  isStepOfMultiTask?: boolean;
  ids?: string[];
  fixedReservedKelpReward?: number | null;

  // Local fields
  subTasks?: IAirdropTaskObject[];
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
  lastCompletedAt?: Date;
  multiTaskCompletedStep?: number;
}

export interface IAirdropTaskObject {
  attributes: AirdropTask;
  id: string;
}

export interface ICompletedTaskInfo {
  kelpAllocated: number;
  timestamp: Date;
}

export interface IUserAirdropCampaignData {
  referral_id: string;
  tg_user_id: string;
  scoresdict?: string; //ParsedScoresDict
  referred_by?: string;
  email?: string;
}

export interface IScoreDictValue {
  timestamp?: string;
  kelpAllocated?: number;
}

export type ParsedScoresDict = { [key: string]: IScoreDictValue };
