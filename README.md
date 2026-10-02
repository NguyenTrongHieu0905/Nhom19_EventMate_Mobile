# EventMate - Dong hanh su kien sinh vien

Do an mon Lap trinh thiet bi di dong - De tai 4, Nhom 19.

## Thanh vien

- Bui Trung Kien - MSSV 22002435
- Nguyen Trong Hieu - MSSV 22002985

## Muc tieu

EventMate ho tro sinh vien kham pha su kien trong truong, dang ky lich ca nhan, nhan nhac lich, check-in bang QR va dung AI de tom tat loi ich tham du theo muc tieu ca nhan.

## Luong chinh

1. Kham pha su kien: danh sach FlatList co bo loc, phan trang, loading, error, empty va retry.
2. Dang ky su kien: xem chi tiet, them vao lich ca nhan, xin quyen notification va dat nhac lich.
3. Check-in: xin quyen camera, quet QR, xu ly ma hop le/khong hop le va cap nhat trang thai.
4. AI tom tat: nguoi dung nhap muc tieu, bat dong y chia se du lieu toi thieu, ung dung tra ve goi y tham du.

## Man hinh

- Home
- Events
- EventDetail
- CheckIn
- Schedule
- AiSummary
- Profile

## Cong nghe va CLO

- React Native, Expo, TypeScript: nen tang ung dung.
- React Navigation stack + bottom tabs: dieu huong nhieu man hinh va truyen tham so.
- Deep link: `eventmate19://event/ev-mobile-workshop`.
- Context API + useReducer: trang thai dang ky, yeu thich va check-in.
- Fetch/API layer mo phong: `src/services/eventApi.ts`.
- Expo Camera va Expo Notifications: quet QR va nhac lich.
- Reanimated + Gesture Handler: animation press card va huy hieu keo trong ho so.
- Tamagui: tokens, hai theme va component dung lai.
- AI demo co consent, gioi han dau vao, loading/error va canh bao rieng tu.

## Cai dat va chay

Giao dien duoc cap nhat voi nen sang, bo loc tieng Viet, tim kiem, anh su kien,
lich ca nhan va trang thai check-in hien thi truc tiep. Anh trong assets/events
la anh minh hoa tu Unsplash, khong phai anh chup cac su kien IUH thuc te.
Tamagui duoc ghim cung phien ban; giu package-lock.json khi cai dat.

```bash
npm install
npm run start
```

Chay Android:

```bash
npm run android
```

Kiem tra TypeScript:

```bash
npm run typecheck
```

## Build EAS

```bash
npm install -g eas-cli
eas login
eas build --profile preview --platform android
```

Preview tao APK. Production tao AAB. OTA update co the cau hinh bang `eas update --branch production` sau khi co project that.

## Che do demo

Ung dung khong yeu cau backend that khi bao ve. Du lieu mau nam trong `src/data/events.ts`; service API mo phong do tre va loi mang nho de kiem thu loading/error/retry.

Ma QR demo:

```text
EVENTMATE:ev-mobile-workshop
```

## Bao mat

- Khong commit API key.
- Cloud AI chi duoc bat khi dua key vao bien moi truong/EAS secret.
- AI demo khong gui MSSV, anh, vi tri hay du lieu nhay cam.
- Camera va notification deu co xu ly truong hop nguoi dung tu choi quyen.

## 8 ca kiem thu chuc nang

| ID | Ca kiem thu | Ket qua mong doi |
| --- | --- | --- |
| TC01 | Mo app lan dau | Home hien thong ke rong va nut dieu huong |
| TC02 | Tai danh sach su kien | FlatList hien 3 su kien dau, nut tai them hoat dong |
| TC03 | Loc theo career | Danh sach chi con su kien career |
| TC04 | Mo chi tiet su kien | App truyen eventId va hien agenda, dien gia, so cho |
| TC05 | Dang ky khong nhac lich | Su kien vao Schedule, khong can permission notification |
| TC06 | Dang ky co nhac lich nhung tu choi quyen | App bao loi de hieu, khong treo |
| TC07 | Check-in ma demo | Trang thai checked-in cap nhat trong Schedule va Profile |
| TC08 | AI khong dong y consent | App chan goi AI va hien thong bao rieng tu |

## Phan cong goi y

- Bui Trung Kien: UI/Tamagui, danh sach su kien, chi tiet, README.
- Nguyen Trong Hieu: state, API mock, camera check-in, notification, AI summary va bao cao.
