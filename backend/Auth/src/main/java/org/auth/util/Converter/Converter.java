package org.auth.Util.Converter;

public interface Converter<F, T> {
    T convert(F from);
}