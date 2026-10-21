import { C, fonts } from './tokens';

// One label treatment for shared fields and standalone legacy forms.
export default function FormLabel({ children, style, ...props }) {
  return <label {...props} style={{ fontFamily: fonts.body, fontSize: 16, fontWeight: 600, letterSpacing: 0, textTransform: 'none', color: C.espresso, ...style }}>{children}</label>;
}