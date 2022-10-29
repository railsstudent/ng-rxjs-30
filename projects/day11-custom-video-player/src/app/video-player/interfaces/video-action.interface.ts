import { VideoActionEnum } from '../enums/video-actions.enum';
import { VideoPlayerRangeInput } from './video-player.interface';

export type ActionValue = number | VideoPlayerRangeInput | undefined;

export interface VideoAction {
    action: VideoActionEnum,
    arg: ActionValue,
}
