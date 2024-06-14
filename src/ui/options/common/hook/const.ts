import {SignalRRequests} from '@/enums/signalRRequests';
import {OptionPxRequestType} from '@/types/api/option';


export const optionPxSignalREventName: {[type in OptionPxRequestType]: SignalRRequests} = {
  OneTime: SignalRRequests.REQUEST_PX_OPTIONS,
  Subscribe: SignalRRequests.SUBSCRIBE_PX_OPTIONS,
};
