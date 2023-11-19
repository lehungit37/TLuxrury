import { toastMessage } from 'src/utils/toast';

export const useCopyToClipboard = () => {
  const copyText = (text: string, toastMs: string) => {
    navigator.clipboard.writeText(text).then(() => toastMessage.success(toastMs));
  };

  return { copyText };
};
