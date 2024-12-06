import { Injectable } from '@angular/core';
import { AES, enc, lib } from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly sk = '4c5ed4d8';

  setItem<T>(key: string, data: T): boolean {
    const hashedValue = AES.encrypt(JSON.stringify(data), this.sk).toString();
    localStorage.setItem(key, hashedValue);
    return true;
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }

  getItem<T>(itemName: string): T | null {
    const encryptedLocalData: string | null = localStorage.getItem(itemName);
    if (!!encryptedLocalData) {
      const wordArrayLocalData: lib.WordArray = AES.decrypt(encryptedLocalData, this.sk);
      return !!wordArrayLocalData ? (JSON.parse(wordArrayLocalData.toString(enc.Utf8)) as T) : null;
    }
    return null;
  }

  removeAllItems() {
    localStorage.clear();
  }
}
