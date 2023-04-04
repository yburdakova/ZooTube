export interface DetailsProps {
    params: {
        id: string;
    };
    postDetails: Video;
}

export interface FooterList {
    items: string[];
    mt:boolean;
}

export interface Video {
    caption: string;
    video: {
    asset: {
        _id: string;
        url: string;
    };
    };
    _id: string;
    postedBy: {
    _id: string;
    userName: string;
    image: string;
    };
    likes: {
    postedBy: {
        _id: string;
        userName: string;
        image: string;
    };
    }[];
    comments: {
    comment: string;
    _key: string;
    postedBy: {
        _ref: string;
    };
    }[];
    userId: string;
}

export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
}

export interface VideoCardProps {
    post: Video;
}

export interface NoResultsProps {
    text: string;
}

export interface LikeProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any;
    flex: string;
}

export interface WidthProps {
    width: number;
    window:{
        innerWidth:number
    };
}