export interface ItemOfPartDetailBase {
    type?: string;
    content?: string;
    video?: string;
    img?: string;
    dataJson?: string;
    dataJsonObj?: object;
    youtubeId?: string;
    audio?: string;
    duration?: number;
    result?: ScorePoint;
}
export interface User {
    id?: string;
    name?: string;
    email?: string;
    lastTimeOpenApp?: number;
    isIOS?: boolean;
    isVip?: boolean;
}
export interface BhDetailBase {
    isShowQuestionNotInList?: boolean;
    audio?: string;
    img?: string;
    pdfPathLesson?: string;
    isShowTranslateButton?: boolean;
    isWriting?: boolean;
    /**Có item này sẽ show Luyen Tap screen*/
    listItemBaiTap?: (any)[];
    listItemBaiGiang?: (ItemOfPartDetailBase)[];
    groupQuestions?: GroupQuestion[];
}
export interface VideoObj {
    id?: string;
    title?: string;
    thumbnail?: string;
    playlistId?: string;
    viewCount?: number;
    duration?: number;
    isSeleced?: boolean;
    isWatched?: boolean;
}
export interface Playlist {
    title?: string;
    thumbnail?: string;
    id?: string;
    itemCount?: number;
    isSeleced?: boolean;
}
export interface ScorePoint {
    noCorrect?: number;
    noTotal?: number;
}
export interface CateObj {
    isCate?: boolean;
    title?: boolean;
    type?: string;
}
export interface PartSummary {
    itemCount?: number;
    childId?: number;
    title?: string;
    type?: string;
    pathBaiHoc?: string;
    des?: string;
    img?: string;
    score?: ScorePoint;
    isDownloading?: boolean;
    isDownloaded?: boolean;
    isDownloadError?: boolean;
    isLockLanscape?: boolean;
    isBaiGiangAndBaiTap?: boolean;
    isNoQuestion?: boolean;
    isMine?: boolean;
    fullSumaryAllLesson?: [PartSummary];
    charaterObjs?: CharacterObj[];
    id?: number;
    practice?: number;
    isWriting?: boolean;
    isSpeaking?: boolean;
    isVoca?: boolean;
    isLocal?: boolean;
    isDecrypt?: boolean;
    isDeThi?: boolean;
    level?: number;
}
export interface CharacterObj {
    letter?: string;
    sub?: string;
    sub2?: string;
    fileNames?: string[];
    audio?: string;
    isChecked?: boolean;
}
export interface AdsObj {
    typeAds?: number;
    allowBannerBackup?: boolean;
    des?: string;
    title?: string;
    ios_id?: string;
    package?: string;
    isMyAds?: boolean;
    large?: boolean;
}
export interface Sentence {
    s?: string;
    sub?: string;
    sTranslate?: string;
    audio?: string;
    person?: string;
    indexPerson?: number;
    index?: number;
    isEnableTranslate?: boolean;
    userSpeaking?: boolean;
    userSpeakingValue?: string;
}
export interface GroupQuestion {
    itemOfPartDetails: ItemOfPartDetailBase[];
    content: string;
    audio: string;
    img: string;
    type: string;
    stt: number;
}
